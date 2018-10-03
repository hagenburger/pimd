# PIMD Attribute Plugin

 Adds HTML attribute to code blocks and other elements.

## Example usage

````markdown
# Headline <?: [title="Headline title"] ?>

```html [data-xyz=123]
<p>Example</p>
```
````

Results in: 

```html
<h1 title="Headline title">Headline</h1>

<pre data-xyz="123" class="hljs language-html"><code><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Example<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre>
```

---

## Copyright

Copyright 2018++ [Nico Hagenburger](https://www.hagenburger.net). See
[MIT-LICENSE](MIT-LICENSE) for details. Get in touch with
[@hagenburger](https://twitter.com/hagenburger) on Twitter or
[open an issue](https://github.com/hagenburger/pimd/issues/new).
