import { useState } from 'react';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [archive, setArchive] = useState([]);
  const [advVersion, setAdvVersion] = useState(false);


  const addTask = (e) => {
    e.preventDefault();

    setList([...list, {text: input, done: false, editing: false}]);
    setInput('')
  }

  const deleteItem = (index) => {
    let arr = [...list];
    setArchive([...archive, arr[index]]);
    arr.splice(index, 1)
    setList(arr);
  }

  const permenantDelete = (index) => {
    let arr = [...archive];
    arr.splice(index, 1)
    setArchive(arr);
  }

  const checkTask = (index, e) => {
    if(e.target === e.currentTarget){
      let arr = [...list];
      arr[index].done = !arr[index].done;
      setList(arr);
    }    
  }

  const editTask = (index) => {
    let arr = [...list];
    arr[index].editing = !arr[index].editing;
    setList(arr);
  }

  const updateText = (index, e) => {
    let arr = [...list];
    arr[index].text = e.target.value;
    setList(arr);
  }

  const reAddToList = (index) => {
    let arr = [...archive];
    setList([...list, arr[index]]);
    arr.splice(index, 1)
    setArchive(arr);
  }

  return (
    <div>
      <button className="versionButton" onClick={() => setAdvVersion(!advVersion)}>{advVersion ? 'See Basic Version' : 'See Advanced Version'}</button>
      <div className="todoList">
        <form onSubmit={addTask}>
          <input type="text" value={input} required onChange={(e) => setInput(e.target.value)} placeholder="add task"/>
          <button type="submit">+</button>
        </form>
        <div className="taskWrap">
          {list.map((task, index) => {
            return(
              <div key={index} className={task.done ? 'task done' : 'task'}>
                {(advVersion && task.editing) ? (
                  <input value={task.text} onChange={(e) => updateText(index, e)} style={{width: '330px'}}/>
                ) : (
                  <p style={{width: advVersion ? '330px' : '365px'}} onClick={(e) => checkTask(index, e)}>{task.text}</p>
                )}
                {(advVersion && task.editing) && <button style={{backgroundColor: 'rgb(7, 210, 0)'}} onClick={() => editTask(index)}>✓</button>}
                {(advVersion && !task.editing) && <button style={{backgroundColor: 'rgb(255, 170, 0)'}} onClick={() => editTask(index)}>✎</button>}
                <button style={{backgroundColor: 'rgb(255, 32, 20)'}} onClick={() => deleteItem(index)}>x</button>
              </div>
            )
          })}
        </div>
      </div>
      {advVersion && (
        <div className="archive">
          <h3>Archive</h3>
          <div className="archiveTasks">
            {archive.map((task, index) => {
              return (
                <div key={index} className="task">
                  <p style={{cursor: 'default', width: '330px'}}>{task.text}</p>
                  <button style={{backgroundColor: 'rgb(7, 210, 0)'}} onClick={() => reAddToList(index)}>+</button>
                  <button style={{backgroundColor: 'rgb(255, 32, 20)'}} onClick={() => permenantDelete(index)}>x</button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
