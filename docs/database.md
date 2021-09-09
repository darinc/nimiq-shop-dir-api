# database description

## Merchant related tables
![MerchantDB](images/merchantDB.svg)

Shops/Merchants (merchant table)
- can have addresses (address table)
- can have links (link table)
- can have shipping limits (limit table)
- can offer products and services (product table)

Shipping limits (limit table) 
- have a defined limit_type (ENUM)
  - 'geo_circle'
  - 'polygon'
  - 'dependent_locality'
  - 'city_or_locality'
  - 'state_or_province'
  - 'zip_or_postal_code'
  - 'sorting_code'
  - 'country'
- limits can be associated with a specific merchant address

Links (link table)
- have a defined link_type (ENUM)
  - 'url'
  - 'google_maps'
- can be the URL to the merchant's web site
- can be a link to the merchant in google maps
- links can be associated with a specific merchant address


## API related tables
![apiDB](images/apiDB.svg)

Accounts (account table)
- are named
- can be active or inactive

Users (user table)
- are tied to accounts
- can be active or inactive
- are attached to one or more user_roles (user_role table)
- if role permits, the account can create new api_tokens
- will (soon) support login reset via a reset_token (reset_token table)

API Tokens (api_token table)
- are created by authorized users
- have a defined "name" (username)
- can be active or inactive
- are used in auth headers to access api resources
- are attached to api_auth roles (api_auth_role table)

API Auth Permissions (api_auth_permissions)
- are defined per method (GET, POST, DELETE, Etc)
- are defined per path.  e.g: /search
- are attached to api_auth_roles