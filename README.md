# svstore

This is not a completed application

It is an online store. the application where you can buy goods.

#### Four type of users can use this store:
- menagers
- salesmans
- registered users
- unregistred users

#### A menager can:
- see what is sold
- create new menagers 
- approve new salesmans 
 
#### A salesman should:
- add new goods
- see what users tried to buy and call them to sell it

#### A registred user can:
- post comments
- add a good to a basket
- buy a good 

#### An unregistred user:
The only difrence between an unregistred user and a registred user is than an unregistred user can not post comments 

## What is done: 
- Registration
- Logining
- Menager panel
- Salesman panel (only adding goods) 
- goods review
- basket

# Backups
If you want to look at results you can restore database from backups that are uploaded to
https://github.com/safchug/svstoredbbackups 

To restore backups use comand $>mongorestore /db:svstore /dir:<dowloadded dir>