particle cmd:j1s2 ~ ~ ~

tp ^ ^ ^0.28
tp ^ ^ ^0.28 true
tp ^ ^ ^0.28 true
tp ^ ^ ^0.28 true
tp ^ ^ ^0.28 true
tp ^ ^ ^0.28 true
tp ^ ^ ^0.28 true
tp ^ ^ ^0.28 true

function get_nearest_e
execute @s ~ ~-0.9 ~ tag @p[tag=nearest,r=1.15] add victim
tag @a remove nearest

tag @s add j1s2
execute @p[tag=victim] ~ ~ ~ execute @e[tag=j1s2] ~ ~ ~ function skill/job1/s2_damage
tag @s remove j1s2

function check_movable
execute @s[tag=!movable] ~ ~ ~ function skill/job1/s2_hit