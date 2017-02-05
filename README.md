## vo: data observable

### Usage:
```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>basic</title>
    </head>
    <body>
        <input id="text" />
        <p>hello <span id="span"></span></p>
        <script src="../vo.js"></script>
        <script>
            var data = { name: '' };
            var span = document.querySelector('#span');
            var text = document.querySelector('#text');

            vo.observe(data).watch('name', (val) => {
                span.innerHTML = val;
            });

            text.addEventListener('input', () => {
                data.name = text.value;
            }, false);
        </script>
    </body>
```