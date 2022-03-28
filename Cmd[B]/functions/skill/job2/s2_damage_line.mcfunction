tag @s add src
tag @a[tag=target] add dst
function make_line
tag @s remove src
tag @a remove dst

scoreboard players set @s param1 221
scoreboard players set @s param2 20
scoreboard players set @s param3 1
scoreboard players set @s param4 2
scoreboard players set @s param5 90

tag @s add executor
function show_particle
tag @s remove executor