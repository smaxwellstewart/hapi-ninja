API
===

Reports
-------


**POST** /api/report/generate/simple

Generate a synchronous report from the following payload...

```json
{
	"url":"http://mobicow.com",
	"deviceId": "53b5817ebb98f02076d847be"
}
```

**POST** /api/report/find

Find reports based on various filters. Registered users only. Example payload...

```json
{
	"sDate":"2014-07-03",
	"eDate": "2014-07-04",
	"scans": ["53b5817ebb98f02076d847be", "53b5817ebb98f02076d847bf"],
	"countries": ["CA", "UK"],
	"devices": ["53b5817ebb98f02076d847be", "53b5817ebb98f02076d847bf"]
}
```


Devices
-------

**GET** /api/device

Get all scan devices. This includes user-agents and viewport size. 

**GET** /api/device/{id}

Get a specific device.

Scans
-----

The following are for registered users only:

**POST** /api/scan

Creates a new scan.

```json
{
	"url":"http://example.com",
	"countries": ["CA", "UK"],
	"devices": ["53b5817ebb98f02076d847be", "53b5817ebb98f02076d847bf"]
}
```

**GET** /api/scan

Get all your scans.

**GET** /api/scan/{id}

Get a specific scan.

**PUT** /api/scan/{id}

Updates a scan.

**DELETE** /api/scan/{id}

Delets a scan.