// middleware
const { profile } = require('./db.json');
const baseurl = 'http://localhost:3001';

const withPagination = ({ req, db, limit = 10, dbTable }) => {
  const queryLimit = req.query.limit || limit;

  const path = req.path.split('/');
  const table = db.get(dbTable || path[1]);

  const data = table.value();
  const page = Number(req.query.page) || 1;
  const query = {
    ...req.query,
    page,
    limit: queryLimit,
  };
  const results = data.slice((page - 1) * queryLimit, page * queryLimit);
  let maxPages = Math.floor(data.length / queryLimit);
  if (maxPages < data.length / queryLimit) {
    maxPages++;
  }
  const nextUrlParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (key === 'page' && page < maxPages) {
      nextUrlParams.set('page', `${page + 1}`);
    } else {
      nextUrlParams.set(key, value);
    }
  });
  const prevUrlParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (key === 'page' && page > 1) {
      prevUrlParams.set('page', `${page - 1}`);
    } else {
      prevUrlParams.set(key, value);
    }
  });
  const basePath = dbTable
    ? req.path.substring(1, req.path.length - 1)
    : path[1];
  const previous =
    page === 1 ? null : `${baseurl}/${basePath}/?${prevUrlParams.toString()}`;
  const next =
    maxPages > page
      ? `${baseurl}/${basePath}/?${nextUrlParams.toString()}`
      : null;

  return { count: data?.length, previous, next, results };
};

const routeHandlers = {
  'GET /news/:slug/read': handleNewsRead,
  'POST /login': handleLogin,
  'DELETE /todo/bulk/': handleBulkDeleteTodo,
  'PATCH /todo/bulk/': handleBulkPatchTodo,
  'GET /users/me': handleUsersMe,
  'GET /': handleRoot,
};

module.exports = (req, res, next, db) => {
  const handler = matchRoute(req, routeHandlers);
  if (handler) {
    handler(req, res, db);
  } else {
    next();
  }
};

function matchRoute(req, handlers) {
  if (req.method === 'GET' && req.path === '/') {
    return handlers['GET /'];
  }

  for (const route in handlers) {
    const [method, path] = route.split(' ');
    const regExp = new RegExp(`^${path.replace(/:[^\s/]+/g, '([^/]+)')}$`);
    const match = req.path.match(regExp);

    if (req.method === method && match) {
      return handlers[route];
    }
  }

  return null;
}
function handleNewsRead(req, res, db) {
  const table = db.get('news');
  const data = table.value();
  const slug = req.path.split('/')[2];
  const results = data.map((news) =>
    news.slug === slug ? { ...news, is_read: true } : news,
  );

  res.status(200).json(results);
}
function handleLogin(req, res) {
  if (req.body.username === 'login' && req.body.password === 'password') {
    res.status(200).json(profile);
  } else {
    res.status(400).json({ 'FINAL_FORM/form-error': 'wrong credentials' });
  }
}
function handleBulkDeleteTodo(req, res) {
  const result = [];
  res.status(200).json(result);
}
function handleBulkPatchTodo(req, res, db) {
  const table = db.get('todo');
  const arr = req.query.ids.split(',');
  req.query.ids
    .split(',')
    .forEach((item) =>
      db._.updateById(table, item.id, { done: req.body.done }),
    );
  const data = table.value();
  const result = data.map((item) =>
    arr.some((id) => id === item.id) ? { ...item, done: req.body.done } : item,
  );
  res.status(200).json(result);
}
function handleUsersMe(req, res, db) {
  const table = db.get('me');
  const data = table.value();
  res.status(200).json(data);
}
function handleRoot(req, res, db) {
  const results = withPagination({ req, db });
  res.status(200).json(results);
}
