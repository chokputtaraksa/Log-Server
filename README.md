Credit by: https://github.com/divhide/node-log-server

This server will store log to file, it will help us investigate error and bugged that occurred on Application.

Request body can be customize for application usecase but at lease should have these field

'POST /logs/<folder_name/service_name>'
```
{
    "createdTime": "",
    "services_name": "",
    "message": ""
}
```

To easy for download or look at message this server have UI
GET /logs


