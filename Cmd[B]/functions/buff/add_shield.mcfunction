scoreboard players operation @a[tag=target] shield += @s param1

tag @s add self
execute @a[tag=target] ~ ~ ~ execute @p[tag=self] ~ ~ ~ scoreboard players operation @s given_shield += @s param1
tag @s remove self