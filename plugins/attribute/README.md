# PIMD Attribute Plugin

 Adds HTML attribute to code blocks and other elements.

## Example usage

````markdown

# Headline <?: #my-headline ?>

```
html [data-xyz=123]
<p>Example</p>
```

Results in:

``` html
# Headline <?: [title="Headline title"] ?>
```

---

## Copyright

Copyright 2018++ [Nico Hagenburger](https://www.hagenburger.net). See
[MIT-LICENSE](MIT-LICENSE) for details. Get in touch with
[@hagenburger](https://twitter.com/hagenburger) on Twitter or
[open an issue](https://github.com/hagenburger/pimd/issues/new).
