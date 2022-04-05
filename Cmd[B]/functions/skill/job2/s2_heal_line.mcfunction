tag @s add src
tag @a[tag=target] add dst
tag @s remove dst
function make_line
tag @s remove src
tag @a remove dst

scoreboard players set @s param1 222
scoreboard players set @s param2 20
scoreboard players set @s param3 1
scoreboard players set @s param4 6
scoreboard players set @s param5 90

tag @s add executor
function show_particle
tag @s remove executor