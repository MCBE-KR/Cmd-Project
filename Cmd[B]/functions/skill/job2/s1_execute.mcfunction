execute @a[tag=target] ~ ~ ~ particle cmd:j2s1 ~ ~ ~
playsound cmd.j2s1 @a[r=20] ~ ~ ~

tag @s add attacker
tag @p[tag=target] add victim

scoreboard players set @s param1 70
function damage/damage

scoreboard players set @s param1 50
scoreboard players set @s param2 1
function debuff/add_heal_reduce

tag @s remove attacker
tag @a remove victim