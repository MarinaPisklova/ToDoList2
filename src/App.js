import React from 'react';
import styles from './App.module.scss'
import ToDoContainer from './component/ToDo/ToDoContainer';

class App extends React.Component {
  render() {
    return (
      <div className={styles.container}>
          <ToDoContainer />
      </div>
    )
  }
}

export default App;
