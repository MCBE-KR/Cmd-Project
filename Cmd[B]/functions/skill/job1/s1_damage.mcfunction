scoreboard players operation @a team -= @s team
tag @p[scores={team=0, job=1}] add attacker
scoreboard players operation @a team += @s team

scoreboard players set @p[tag=attacker] param1 150
execute @p[tag=attacker] ~ ~ ~ function damage/damage

tag @a remove victim
tag @a remove attacker

function skill/job1/s1_hit