> CodeInput

* Usage

```javascript
new CodeInput('inputs', // containerID
    {
        number: 6, // The number of input boxes
        autofocus: true,
        width: '35px',
        height: '35px',
        type: 'number', // The type of input (number or text)
        fontSize: '18px',
        complete: function (value) {
            console.log('complete', value);
        }
    }
);
```

* Example

[Demo](./example.html)

![demo](../assets/codeInput.gif)