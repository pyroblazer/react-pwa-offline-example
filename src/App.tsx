import React, { useState, useEffect } from 'react';
import swal from 'sweetalert2';
import Navbar from './components/Navbar';
import Todos from './components/Todos';
import Todoslist from './components/TodosList';

const App = () => {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [counters, setCounters] = useState<any[]>([]);

  useEffect(() => {
    const arr2: any[] = [];

    const openIndexedDB = async () => {
      let request = window.indexedDB.open("Database", 1);
      let db: IDBDatabase, tx, store;

      request.onupgradeneeded = (e) => {
        db = request.result;
        store = db.createObjectStore("Todo", { keyPath: "id" });
      };

      request.onerror = (e) => {
        console.log('There was an error', e);
      };

      request.onsuccess = (e) => {
        db = request.result;
        tx = db.transaction("Todo", "readwrite");
        store = tx.objectStore("Todo");

        let id:number = 0;
        let q = store.getAll();

        q.onsuccess = () => {
          let data = q.result;

          for (var p of data) {
            arr2.push(p);
            id = p.id;
            setId(id);
          }

          const updatedCounters = [...counters, arr2];
          setCounters(updatedCounters[0]);
        };

        tx.oncomplete = () => {
          db.close();
        };
      };
    };

    openIndexedDB();
  }, []); // Empty dependency array to mimic componentDidMount behavior

  const handleTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setDescription(e.target.value);
  };

  const handleAdd = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    let newId = id + 1;
    setId(newId);

    const obj = {
      id: newId,
      title: title,
      description: description
    };

    const updatedTodos = [...counters, obj];
    setCounters(updatedTodos);
    setTitle('');
    setDescription('');

    let request = window.indexedDB.open("Database", 1);
    let db: IDBDatabase, tx, store;

    request.onupgradeneeded = (e) => {
      db = request.result;
      store = db.createObjectStore("Todo", { keyPath: "id" });
    };

    request.onerror = (e) => {
      console.log('There was an error', e);
    };

    request.onsuccess = (e) => {
      db = request.result;
      tx = db.transaction("Todo", "readwrite");
      store = tx.objectStore("Todo");

      db.onerror = (e) => {
        console.log("ERROR", e);
      };

      store.put(obj);

      setId(newId);

      tx.oncomplete = () => {
        db.close();
      };
    };
  };

  const handleDelete = (counterId: IDBValidKey | IDBKeyRange) => {
    let request = window.indexedDB.open("Database", 1);
    let db: IDBDatabase, tx, store;

    request.onupgradeneeded = (e) => {
      db = request.result;
      store = db.createObjectStore("Todo", { keyPath: "id" });
    };

    request.onerror = (e) => {
      console.log('There was an error', e);
    };

    request.onsuccess = (e) => {
      db = request.result;
      tx = db.transaction("Todo", "readwrite");
      store = tx.objectStore("Todo");

      const updatedCounters = counters.filter(c => c.id !== counterId);
      setCounters(updatedCounters);

      let q = store.delete(counterId);

      q.onsuccess = () => {
        console.log("deleted");
      };

      tx.oncomplete = () => {
        db.close();
      };
    };
  };

  const handleEdit = (counter: { title: any; description: any; id: any; }) => {
    let id: string | number, tit: any, desc: any, obj;

    swal.fire({
      title: 'Firebase Realtime Todo',
      html: `<h2>Update Your Todo</h2>
            <input id="swal-input1" class="swal2-input" value=${counter.title} autofocus placeholder="Title" >
            <input id="swal-input2" class="swal2-input" value=${counter.description} placeholder="Description" >`,
      preConfirm: function () {
        return new Promise(function (resolve) {
          if (true) {
            resolve([
              tit = (document.getElementById('swal-input1') as HTMLInputElement)?.value,
              desc = (document.getElementById('swal-input2') as HTMLInputElement)?.value,
              id = counter.id
            ]);
          }
        });
      }
    }).then((result: any) => {
      let request = window.indexedDB.open("Database", 1);
      let db: IDBDatabase, tx, store;

      request.onupgradeneeded = (e) => {
        db = request.result;
        store = db.createObjectStore("Todo", { keyPath: "id" });
      };

      request.onerror = (e) => {
        console.log('There was an error', e);
      };

      request.onsuccess = (e) => {
        db = request.result;
        tx = db.transaction("Todo", "readwrite");
        store = tx.objectStore("Todo");

        obj = {
          id: id,
          title: tit,
          description: desc
        };

        let q = store.put(obj);

        q.onsuccess = () => {
          console.log("Edited");
        };

        const updatedCounters = [...counters];
        updatedCounters[id as number] = { ...obj };
        setCounters(updatedCounters);

        tx.oncomplete = () => {
          db.close();
        };
      };

      swal.fire('Firebase Realtime Todo!', 'Your Todo Has Been Updated!', 'success');
    });
  };

  return (
    <div className="App">
      <Navbar />
      <br /> <br />
      <Todos
        title={title}
        description={description}
        onAdd={handleAdd}
        handleTitle={handleTitle}
        handleDescription={handleDescription}
      />
      <br /> <br />
      <Todoslist list={counters} onDel={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default App;
