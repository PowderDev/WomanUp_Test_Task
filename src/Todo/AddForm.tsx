import React, { useRef } from 'react';
import { useFormik } from 'formik';
import { AddTodoValues } from 'types/types';
import { useActions } from 'redux/hooks';

export const AddForm = () => {
  const actions = useActions();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik<AddTodoValues>({
    initialValues: {
      title: '',
      description: '',
      file: null,
      deadline: '',
    },
    onSubmit: async (values) => {
      await actions.addTodoThunk(values);
      formik.resetForm();
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
  });

  return (
    <React.Fragment>
      <h3>Add a ToDo</h3>

      <form className="addForm" onSubmit={formik.handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="file">Attache a file</label>
          <input
            type="file"
            id="file"
            ref={fileInputRef}
            onChange={(e) =>
              formik.setFieldValue('file', e.target.files?.item(0))
            }
          />
        </div>

        <div className="form-field">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formik.values.deadline}
            onChange={formik.handleChange}
            required
          />
        </div>
        <button disabled={formik.isSubmitting} type="submit">
          {formik.isSubmitting ? 'Loading...' : 'Add Todo'}{' '}
        </button>
      </form>
    </React.Fragment>
  );
};
