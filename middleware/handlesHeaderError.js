const handleHeaderError = (err, req, res, next) => {
    if (err.code === 'ERR_HTTP_HEADERS_SENT') {
        
        console.error('Headers already sent');
        res.status(500).send('Internal server error');
      } else {
        next();
      }
}

module.exports = handleHeaderError