---
    slug: client-crm
    title: "Client CRM"
    date:  Nov 11 2021 12:00 AM
    author: Joe
    description:  I created this application for my support team to track clients' status as they went through the process of filing reports.
    stack: 
      - MongoDB
      - Express
      - NextJS
      - NodeJs
      - JWT Token Autorization
    github: https://github.com/joecaro/crm
    demo: https://crm.josephcarothers.com/
    tags:
      - project 
      - featured
      - nextjs
    tech:
      - react
      - next
      - html
      - css
      - mongo
      - node
      - express
    image: https://res.cloudinary.com/joecarothers/image/upload/v1652918001/misc/Projects/CRM-Mockup_zul9pq_wedgib.png
    position: 2
---

**Client CRM**

This is an internal tool I created using Nextjs and MongoDB to help track clients progress during a reporting period. The main purpose was to speed up our tracking speed and reduce effort. Previously we used excel to track this information, so having a database and tailored UI has sped up the process.

### Problems:

- Traking in excel is tedious and takes up valuable support resources in busy reporting periods
- Creating new excels and updating organization information was unreliable. Clients would move spreadsheets, change POCs, etc.

### Solutions:

- UI would speed up process by allowing users to quickly scroll through list and update status of client with one click.
- Stored database allowed for consistent information on clients and gave the ability to update a single source.
- Allows for seeing quick totals and exporting list to share with others.

![Desktop](https://res.cloudinary.com/joecarothers/image/upload/v1650982026/misc/Projects/CRM_Quarterly_iqgzq5.jpg)
![Mobile](https://res.cloudinary.com/joecarothers/image/upload/v1651167756/misc/Projects/crm/Screenshot_2022-04-28_134145_h4t4ba.jpg)

The key features of this CRUD application are:

- Create new records, assigning them to one of a select number of groups.
- Within each group, easily track the progress of each record
- Store simple information on each record like date completed, notes, and point of contact
- Have quick at a glance totals for each page as well as an spreadsheet export

**_stack_**

I created this application on NextJS
