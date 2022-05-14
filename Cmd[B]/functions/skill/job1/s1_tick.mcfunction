particle cmd:j1s1 ~ ~ ~

tp ^ ^ ^0.35
tp ^ ^ ^0.35 true
tp ^ ^ ^0.35 true
tp ^ ^ ^0.35 true

function get_nearest_e
execute @s ~ ~-0.9 ~ tag @p[tag=nearest, r=1.4] add victim
tag @a remove nearest

tag @s add j1s1
execute @p[tag=victim] ~ ~ ~ execute @e[tag=j1s1] ~ ~ ~ function skill/job1/s1_damage
tag @s remove j1s1

function check_movable
execute @s[tag=!movable] ~ ~ ~ function skill/job1/s1_hit