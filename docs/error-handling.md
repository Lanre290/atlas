# Error Handling

Atlas returns errors in a consistent, developer-friendly JSON format. All errors include an `error` field with a human-readable message.

## Error Format
```json
{
  "error": "Description of the error."
}
```

## Common Errors
| HTTP Status | Message                        | Cause                          |
|-------------|-------------------------------|-------------------------------|
| 400         | Missing query parameter q      | Required parameter not given   |
| 400         | Missing exploration query      | Required path/query missing    |
| 404         | Mission not found              | No mission with given ID       |
| 500         | Internal server error          | Unexpected server failure      |

## Example
```json
{
  "error": "Mission not found"
}
```

> **Tip:** Always check for the `error` field in responses to handle failures gracefully.
