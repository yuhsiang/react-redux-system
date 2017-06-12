(function() {
  const express = require('express');
  const router = express.Router();
  const has = Object.prototype.hasOwnProperty;

  router.use(function timeLog(req, res, next) {
    next();
  });

  router.get('/', (req, res) => {
    res.send('try something else');
  });

  router.post('/auth', (req, res) => {
    if (!has.call(req.body, 'password') && !has.call(req.body, 'username')) {
      res.send({code:-1, data:{}, msg: 'login failed'});
      return;
    }
    console.log('success');
    setTimeout(() => res.send({code:0, data:{token:'5566'}, msg: 'success'}), 1000);
  });

  router.get('/abilities', (req, res) => {
    if (!req.query.hasOwnProperty('token') || req.query.token !== '5566') {
      return res.send({});
    }
    setTimeout(() => {
      const abilities = {
        code: 0,
        data: {
          sideMenus: [
            {
              id: 'ba000001',
              text: '數據顯示',
              textCode: 'StatsOverview',
              importCode: 'StatsOverview'
            },
            {
              id: 'ba000002',
              text: '數據分析',
              textCode: 'StatsAnalytics',
              importCode: 'StatsAnalytics'
            },
            {
              id: 'ba000003',
              text: '階層數據比較',
              textCode: 'StatsHierarchy',
              importCode: 'StatsHierarchy'
            },
            {
              id: 'ba000004',
              text: '詳細數據調整',
              textCode: 'StatsDetail',
              importCode: 'StatsDetail'
            },
          ]
        }
      };
      res.send(abilities);
    }, 1000);
  });

  module.exports = router;

})()
