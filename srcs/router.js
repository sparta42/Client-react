// 참고자료 : https://www.youtube.com/watch?v=6BozpmSjk-Y&ab_channel=dcodedcode
import Dashboard from './view/Dashboard.js';

const router = async () => {
  const routes = [
    {path: '/',
      view: Dashboard}
  ];

  const potentialMatches = routes.map(route => ({
    route,
    isMatch: location.pathname === route.path
  }));

  let Match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

  if (!Match) {
    Match = {
      route: routes[0],
      isMatch: true
    };
  }

  const View = new Match.route.View();

  document.querySelector('#app').innerHTML = await View.getHtml();
};

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
