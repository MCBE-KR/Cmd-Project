scoreboard players set @s param1 15
function get_hit_scan
function is_enemy
execute @s[scores={result1=0}] ~ ~ ~ function skill/job2/s1_fail
execute @s[scores={result1=1}] ~ ~ ~ function skill/job2/s1_execute
tag @a remove target