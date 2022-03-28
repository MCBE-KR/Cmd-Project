execute @p[tag=victim] ~ ~ ~ summon cmd:hit ~ ~1 ~

scoreboard players operation @p[tag=victim] hp -= @s param1
scoreboard players operation @s damaged += @s param1
scoreboard players operation @p[tag=victim] taken_damage += @s param1

tag @p[tag=victim,scores={hp=..0}] add death
execute @p[tag=death] ~ ~ ~ function event/on_death
execute @p[tag=death] ~ ~ ~ execute @p[tag=attacker] ~ ~ ~ function event/on_kill
effect @p[tag=death] instant_damage 99999999 255 true
tag @a remove death