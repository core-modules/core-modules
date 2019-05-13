# @core-modules/orm

Manage data from a remote source.

Provides an API over a remote data source, making it easier to create
and manage data/models.

## Concepts

- Model: Structures data
- Action: Performs data operations
- Parser: Performs data manipulation
- Transport: Implements network operations

## Goals

### Stack Agnostic

Makes no stack assumptions. Applications may implement their own
component system, transport system, etc.

### Simplicity

Provides a tiny API to keep management as simple as possible.  

## Examples

### Define Model

```javascript
import { Model } from "@core-modules/orm"

export class Person extends Model {
  
  actions = {
    read: Read
  }
  
}
```

### Define Action

```javascript
import { Action, Parser } from "@core-modules/orm"
import { ApolloTransport } from "@core-modules/orm/transport/apollo"
import gql from "graphql-tag"

class Read extends Action {
  
  query = gql`
    query Person ($id: String!) {
      person (id: $id) {
        id
        firstName
        lastName
      }
    }
  `
  
  transport = new ApolloTransport({
    request: ({ client, ...opts }) => client.query({
      query: this.query,
      ...opts
    })
  })
    
  parser = new Parser({
    id: "data.id",
    firstName: "data.firstName",
    lastName: "data.lastName",
    age: ({ age }) => {
      if (age > 50) return "Over 50"
      return "Less than 50"
    }
  })

}
```

### Invoke

```javascript
import { Person } from "@orm/Person"

await new Person().read({
  options: {
    variables: {
      id: 10
    }
  }
})
````
