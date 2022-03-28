scoreboard players operation @a team -= @s team
tag @p[scores={team=0, job=1}] add attacker
scoreboard players operation @a team += @s team

tag @a[r=6] add in_range

execute @p[tag=attacker,scores={team=1}] ~ ~ ~ tag @a[tag=in_range,scores={team=1}] add target
execute @p[tag=attacker,scores={team=2}] ~ ~ ~ tag @a[tag=in_range,r=6,scores={team=2}] add target

scoreboard players set @p[tag=attacker] param1 125
execute @p[tag=attacker] ~ ~ ~ tag @s add healer
execute @p[tag=healer] ~ ~ ~ function damage/heal
tag @a remove healer

execute @p[tag=attacker,scores={team=1}] ~ ~ ~ tag @a[tag=in_range,scores={team=2}] add victim
execute @p[tag=attacker,scores={team=2}] ~ ~ ~ tag @a[tag=in_range,r=6,scores={team=1}] add victim

scoreboard players set @p[tag=attacker] param1 75
execute @p[tag=attacker] ~ ~ ~ function damage/damage

tag @a remove target
tag @a remove victim
tag @a remove attacker
tag @a remove in_range