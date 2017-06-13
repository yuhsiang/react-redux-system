// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'dashboard',
      onEnter: () => {
        console.log('dashboard onenter');
      },
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Dashboard/reducer'),
          import('containers/Dashboard'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('dashboard', reducer.default);
          renderRoute(component);
        });
        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: '/StatsOverview',
          name: 'StatsOverview',

          getComponent(nextState, cb) {
            const importModules = Promise.all([
              // import('containers/StatsOverview/reducer'),
              import('containers/StatsOverview'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              // injectReducer('dashboard', reducer.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/StatsAnalytics',
          name: 'StatsAnalytics',

          getComponent(nextState, cb) {
            const importModules = Promise.all([
              // import('containers/StatsAnalytics/reducer'),
              import('containers/StatsAnalytics'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              // injectReducer('dashboard', reducer.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/StatsHierarchy',
          name: 'StatsHierarchy',

          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/StatsHierarchy/reducer'),
              import('containers/StatsHierarchy'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, component]) => {
              injectReducer('StatsHierarchy', reducer.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/StatsDetail',
          name: 'StatsDetail',

          getComponent(nextState, cb) {
            const importModules = Promise.all([
              // import('containers/StatsDetail/reducer'),
              import('containers/StatsDetail'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([component]) => {
              // injectReducer('dashboard', reducer.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ]
    },

    {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginPage/reducer'),
          import('containers/LoginPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('login', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
