CREATE TABLE scoot (
    trip_id VARCHAR(255) PRIMARY KEY,
    start_time VARCHAR(255),
    end_time VARCHAR(255),
    distance INTEGER,
    duration INTEGER,
    accuracy INTEGER,
    start_tract VARCHAR(11),
    end_tract VARCHAR(11),
    start_community VARCHAR(2),
    end_community VARCHAR(2),
    start_name VARCHAR(255),
    end_name VARCHAR(255),
    start_lat DECIMAL,
    start_long DECIMAL,
    start_centroid VARCHAR(255),
    end_lat DECIMAL,
    end_long DECIMAL,
    end_centroid VARCHAR(255)
)

SELECT count(*) FROM scoot
WHERE distance != 0
AND start_tract IS NOT NULL
AND end_tract IS NOT NULL

CREATE TABLE divvy (
    trip_id VARCHAR(255) PRIMARY KEY,
    start_time VARCHAR(255),
    end_time VARCHAR(255),
    bikeid INTEGER,
    duration VARCHAR(255),
    from_station INTEGER,
    from_name VARCHAR(255),
    to_station INTEGER,
    to_name VARCHAR(255),
    usertype VARCHAR(255),
    gender VARCHAR(255),
    birthyear INTEGER
)

ALTER TABLE divvy
DROP COLUMN usertype
DROP COLUMN gender
DROP COLUMN birthyear
DROP COLUMN bikeid

SELECT *,
substring(start_time,1,10)
FROM divvy

select * into randScoot from scoot order by random()

select * into scoot from randScoot

select * into filterScoot from scoot
where start_time is not null AND
end_time is not null AND
start_tract is not null AND
end_tract is not null AND
start_lat is not null AND
start_long is not null AND
end_lat is not null AND
end_long is not null