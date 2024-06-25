export const typeDefs = `#graphql
  type User @node(labels: ["User"]) @authorization(
		filter: [
			{ where: { node: { NOT: { blockedUsers_SOME: { to: { id: "$jwt.sub" } } } } } },
			#{ where: { node: { blockedUsers_NONE: { to: { id: "$jwt.sub" } } } } },
		]
	) {
		id: ID! @unique @id

    blockedUsers: [UserBlockedUser!]! @relationship(type: "HAS_BLOCKED", direction: OUT)
  }

  type UserBlockedUser @node(labels: ["UserBlockedUser"]) @authorization(
		filter: [
			{ where: { node: { from: { id: "$jwt.sub" } } } }
		]
	) {
		id: ID! @id @unique

		from: User! @relationship(type: "HAS_BLOCKED", direction: IN) @settable(onCreate: true, onUpdate: false)
		to: User! @relationship(type: "IS_BLOCKING", direction: OUT) @settable(onCreate: true, onUpdate: false)
	}

  type Query {
    getMe: User @cypher(statement: "OPTIONAL MATCH (u:User {id: $jwt.sub}) RETURN u", columnName: "u")
  }
`
