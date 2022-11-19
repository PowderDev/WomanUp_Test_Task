import {
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  doc,
  Timestamp,
  getDocs,
  QuerySnapshot,
  getDoc,
} from 'firebase/firestore';
import { AddTodoValues, Todo } from 'types/types';
import { db, storage } from '../config';
import { useEffect } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { useActions } from 'redux/hooks';

export const useFirebaseRead = () => {
  const actions = useActions();

  useEffect(() => {
    const collectionRef = collection(db, 'todos');
    getDocs<any>(collectionRef).then((snapshot) => {
      actions.fetchTodosThunk(
        (snapshot as QuerySnapshot<Todo>)
          .docChanges()
          .map((item) => ({ ...item.doc.data(), id: item.doc.id }))
          .sort((a, b) => (a.createdAt.seconds < b.createdAt.seconds ? 1 : 0))
      );
    });
  }, [actions]);
};

export const firebaseUpdateCompletion = async (todo: Todo) => {
  const docRef = doc(db, 'todos/' + todo.id);
  await updateDoc(docRef, { completed: !todo.completed });
  const todoDoc = await getDoc(docRef);
  return { ...todoDoc.data(), id: todoDoc.id } as Todo;
};

export const firebaseWrite = async (todo: AddTodoValues) => {
  let filePath = '';

  if (todo.file instanceof File) {
    const storageRef = ref(storage, `files/${uuid()}`);
    const snapshot = await uploadBytes(storageRef, todo.file);
    filePath = await getDownloadURL(snapshot.ref);
  }

  const docRef = await addDoc(collection(db, 'todos/'), {
    ...todo,
    file: filePath,
    deadline: Timestamp.fromDate(new Date(todo.deadline)),
    completed: false,
    createdAt: Timestamp.fromDate(new Date()),
  });

  const doc = await getDoc(docRef);
  return { ...doc.data(), id: doc.id } as Todo;
};

export const firebaseDelete = (id: string) => {
  deleteDoc(doc(db, 'todos/' + id));
};
