//import './App.css';
import Header from 'components/Header';
import ProductFeature from 'features/Product';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';


function App() {

  return (
    <div className="App">

      <Header />

      <Switch>

        <Redirect from='/home' to='/' exact />
        <Redirect from='/post-list/:postId' to='/posts/:postId' exact />

        <Route path='/' component={CounterFeature} exact />
        <Route path='/todo-list' component={TodoFeature} exact />
        <Route path='/albums' component={AlbumFeature} />
        <Route path='/products' component={ProductFeature} />

        <Route component={NotFound} />

      </Switch>


    </div>
  );
}

export default App;
