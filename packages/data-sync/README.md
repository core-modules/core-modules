# @core-modules/data-sync

Synchronise data.

There are situations where a shared data source is mutated and the
"subscribed" consumers need to be updated.

For example:

```
const person = {
  name: "John"
}

const name = person.name
console.log(name) // => John

person.name = "Jane"
console.log(name) // => John (we wanted "Jane")
```
