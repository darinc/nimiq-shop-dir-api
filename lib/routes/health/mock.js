'use strict';

// Follows https://inadarei.github.io/rfc-healthcheck/

const mock_get_health_pass_anyauth = {
    'status': 'pass'
};

const mock_get_health_fail_anyauth = {
    'status': 'fail'
};

const mock_get_health_warn_anyauth = {
    'status': 'warn'
};

// Not implemented yet more detailed example
const mock_get_health_details_pass_yesauth = {
    'status': 'pass',
    'version': '1',
    'releaseId': '1.2.2',
    'notes': [''],
    'output': '',
    'serviceId': '920BE6C3-561C-4AED-82D2-1D51AB2BDCFF',
    'description': 'health of shopdir service',
    'checks': {
        'postgres:available': [
            {
                'componentId': '15420AE8-B410-4AC6-9E77-1A5FC9B194F0',
                'componentType': 'datastore',
                'observedValue': 1,
                'observedUnit': 'boolean',
                'status': 'pass',
                'affectedEndpoints': [
                    '/users/{userId}',
                    '/customers/{customerId}/status',
                    '/shopping/{anything}'
                ],
                'time': '2018-01-17T03:36:48Z',
                'output': ''
            }
        ],
        'postgres:responseTime': [
            {
                'componentId': '15420AE8-B410-4AC6-9E77-1A5FC9B194F0',
                'componentType': 'datastore',
                'observedValue': 250,
                'observedUnit': 'ms',
                'status': 'pass',
                'affectedEndpoints': [
                    '/users/{userId}',
                    '/customers/{customerId}/status',
                    '/shopping/{anything}'
                ],
                'time': '2018-01-17T03:36:48Z',
                'output': ''
            }
        ],
        'postgres:connections': [
            {
                'componentId': '15420AE8-B410-4AC6-9E77-1A5FC9B194F0',
                'componentType': 'datastore',
                'observedValue': 75,
                'status': 'warn',
                'time': '2018-01-17T03:36:48Z',
                'output': '',
                'links': {
                    'self': 'http://api.example.com/dbnode/dfd6cf2b/health'
                }
            }
        ],
        'unleash:available': [
            {
                'componentId': 'BE2E8DBE-E29D-40C3-9A15-6D521093AB4D',
                'componentType': 'component',
                'observedValue': 1,
                'observedUnit': 'boolean',
                'status': 'pass',
                'time': '2018-01-17T03:36:48Z',
                'output': '',
                'links': {
                    'self': 'http://api.example.com/dbnode/dfd6cf2b/health'
                }
            }
        ],
        'unleash:responseTime': [
            {
                'componentId': 'BE2E8DBE-E29D-40C3-9A15-6D521093AB4D',
                'componentType': 'component',
                'observedValue': 75,
                'observedUnit': 'ms',
                'status': 'pass',
                'time': '2018-01-17T03:36:48Z',
                'output': '',
                'links': {
                    'self': 'http://api.example.com/dbnode/dfd6cf2b/health'
                }
            }
        ],
        'uptime': [
            {
                'componentType': 'system',
                'observedValue': 1209600.245,
                'observedUnit': 's',
                'status': 'pass',
                'time': '2018-01-17T03:36:48Z'
            }
        ],
        'cpu:utilization': [
            {
                'componentId': 'BB09A938-6688-4CA9-BED6-8197ED43962B',
                'node': '99F81CB0-3A45-4FD9-AA5E-0C74E1E0D02E',
                'componentType': 'system',
                'observedValue': 85,
                'observedUnit': 'percent',
                'status': 'warn',
                'time': '2018-01-17T03:36:48Z',
                'output': ''
            }
        ],
        'memory:utilization': [
            {
                'componentId': 'BB09A938-6688-4CA9-BED6-8197ED43962B',
                'node': '99F81CB0-3A45-4FD9-AA5E-0C74E1E0D02E',
                'componentType': 'system',
                'observedValue': 8.5,
                'observedUnit': 'GiB',
                'status': 'warn',
                'time': '2018-01-17T03:36:48Z',
                'output': ''
            }
        ]
    },
    'links': {
        'about':
            'http://api.example.com/about/authz',
        'http://api.x.io/rel/thresholds':
            'http://api.x.io/about/authz/thresholds'
    }
};

module.exports = {
    mock_get_health_pass_anyauth,
    mock_get_health_fail_anyauth,
    mock_get_health_warn_anyauth,
    mock_get_health_details_pass_yesauth
};
