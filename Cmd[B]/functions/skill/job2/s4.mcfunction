scoreboard players set @s param1 8
function get_hit_scan
function is_ally
execute @s[scores={result1=0}] ~ ~ ~ function skill/job2/s4_fail
execute @s[scores={result1=1}] ~ ~ ~ function skill/job2/s4_execute
tag @a remove target