import React from 'react';

const Todoslist = ({ list, onEdit, onDel }: any) => {
  const renderList = () => {
    return list.map((todo: { title: any; description: any; id: any; }, index: any) => (
      <tr key={index}>
        <td scope="row">{index}</td>
        <td>{todo.title}</td>
        <td>{todo.description} </td>
        <td>
          <input type="checkbox" className="checkedBox" />
        </td>
        <td>
          <button
            onClick={() => onEdit(todo)}
            className="btn btn-sm btn-info"
          >
            Edit
          </button>
        </td>
        <td>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDel(todo.id)}
          >
            {' '}
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="container table-responsive">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task</th>
            <th scope="col">Description</th>
            <th scope="col">Done</th>
            <th scope="col" colSpan={2} className="text-center">
              Options
            </th>
          </tr>
        </thead>

        <tbody className="todolistmain">{renderList()}</tbody>
      </table>
    </div>
  );
};

export default Todoslist;
