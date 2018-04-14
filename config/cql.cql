CREATE KEYSPACE IF NOT EXISTS annapoorna WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor': 1 };

CREATE TABLE IF NOT EXISTS user (
  id              uuid,
  email           text,
  first_name      text,
  last_name       text,
  active          boolean,
  password        text,
  created         text,
  modified        text,
  modified_by     uuid,
  type            list<text>, -- [user, cook, admin]
  super           boolean, -- admin-true, default-false
  phone           text,
  image           text,
  accessed_portal text, -- date.toISOString();
  accessed_mobile text, -- date.toISOString();
  deleted         boolean,
  facebook        text,
  PRIMARY KEY (id)
);
CREATE INDEX ON user (email);
create index on user (facebook);

CREATE TABLE IF NOT EXISTS menu (
  id              uuid,
  name            text,
  created         text,
  modified        text,
  modified_by     uuid,
  vegetarian      boolean,
  price           text,
  image           text,
  rating          text,
  total_ratings   text,
  deleted         boolean,
  type            text,
  PRIMARY KEY (id, created)
) WITH CLUSTERING ORDER BY (created DESC);
CREATE INDEX ON menu (vegetarian);
CREATE INDEX ON menu (deleted);

CREATE TABLE IF NOT EXISTS voting (
  week            text,
  user            uuid,
  created         text,
  modified          text,
  dishes          list<uuid>,
  atleast         map<text,text>,
  assure          map<text,text>,
  PRIMARY KEY (week, user)
);

CREATE TABLE IF NOT EXISTS orders (
  week            text,
  user            uuid,
  dish            uuid,
  created         text,
  modified        text,
  quantity        int,
  price           text,
  dish_name       text,
  feedback        text,
  rating          text, 
  PRIMARY KEY (week, user, dish)
);

CREATE TABLE IF NOT EXISTS status (
  week            text,
  voting_count    int,
  order_count     int,
  order_deadline  text,
  email_time      text,
  voting_status   boolean,
  order_status    boolean,
  active          boolean,
  voting_deadline  text,
  voting_email_sent  boolean,
  order_email_sent   boolean,
  PRIMARY KEY (week)
);
CREATE INDEX ON status (voting_status);

CREATE TABLE IF NOT EXISTS payments (
  week            text,
  user            uuid,
  amount_paid     text,
  created         text,
  status          text,
  PRIMARY KEY (week, user)
);
