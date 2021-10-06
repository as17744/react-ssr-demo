import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Bar from './Bar';
import Foo from './Foo';
import styles from './index.module.css';

const Home = (props) => {
  const projects = props?.projects || [];

  return (
    <div>
      <div className={styles.addressWrapper}>
        {
          projects.map((p) => <div className={styles.address}>{p.address}</div>)
        }
      </div>
      <Link to="/foo">Foo</Link>
      <Link to="/bar">Bar</Link>
      <Switch>
        <Route path='/foo' exact component={Foo}></Route>
        <Route path='/bar' exact component={Bar}></Route>
      </Switch>
    </div>
  )
};

export default Home;

