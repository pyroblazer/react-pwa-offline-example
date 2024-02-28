import React from 'react';

const Todos = (props: { onAdd: (arg0: any) => any; title: any; handleTitle: (arg0: any) => any; description: any; handleDescription: (arg0: any) => any; }) => {
  return (
    <form onSubmit={(e: any) => props.onAdd(e)}>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card card-body">
            <h3 className="text-center">Add Your Todo</h3>

            <div className="form-group">
              <input
                type="text"
                name="task"
                placeholder="Task Title"
                className="form-control"
                value={props.title}
                required
                onChange={(e: any) => props.handleTitle(e)}
              ></input>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Description"
                name="description"
                className="form-control"
                value={props.description}
                required
                onChange={(e: any) => props.handleDescription(e)}
              ></input>
            </div>
            <hr style={{ marginTop: 0 }} />
            <button className="btn btn-primary">Add</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Todos;
