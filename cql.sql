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
  type            list<text>, -- [user, cook]
  super           boolean, -- admin-true, default-false
  phone           text,
  image           text,
  accessed_portal text, -- date.toISOString();
  accessed_mobile text, -- date.toISOString();
  PRIMARY KEY (id)
);
CREATE INDEX ON user (email);

CREATE TABLE IF NOT EXISTS menu (
  id              uuid,
  name            text,
  created         text,
  modified        text,
  modified_by     uuid,
  vegetarian      boolean,
  price           text,
  image           text,
  PRIMARY KEY (id, created)
) WITH CLUSTERING ORDER BY (created DESC);
CREATE INDEX ON menu (vegetarian);

CREATE TABLE IF NOT EXISTS voting (
  week            text,
  user            uuid,
  created         text,
  modified        text,
  dishes          list<uuid>,
  PRIMARY KEY (week, user)
);

CREATE TABLE IF NOT EXISTS orders (
  week            text,
  user            uuid,
  dish            uuid,
  created         text,
  modified        text,
  quantity        int,  
  PRIMARY KEY (week, user, dish)
);

CREATE TABLE IF NOT EXISTS status (
  week            text,
  voting_count    int,
  order_count     int,
  voting_status   boolean,
  order_status    boolean,
  active          boolean,
  PRIMARY KEY (week)
);
CREATE INDEX ON status (voting_status);
