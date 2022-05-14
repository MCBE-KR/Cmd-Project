effect @p[tag=target] speed 4 2

scoreboard players set @s param1 241
scoreboard players set @s param2 242
scoreboard players set @s param3 120
scoreboard players set @s param4 15
scoreboard players set @s param5 90

tag @s add show_target
function show_particle

scoreboard players set @s param1 243
scoreboard players set @s param2 0
scoreboard players set @s param4 1
scoreboard players set @s param5 0

function show_particle
tag @s remove show_target

scoreboard players set @s param1 220
scoreboard players set @s param2 120
scoreboard players set @s param3 15
scoreboard players set @s param4 10
scoreboard players set @s param5 10

tag @s add healer
function heal_slow
tag @s remove healer