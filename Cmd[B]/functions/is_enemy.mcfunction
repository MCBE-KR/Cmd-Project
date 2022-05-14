scoreboard players set @s result1 0
scoreboard players operation @s temp1 = @s team
scoreboard players operation @s temp1 -= @p[tag=target] team

execute @p[tag=target] ~ ~ ~ scoreboard players operation @s temp1 -= @p[tag=target] team

tag @s add self
execute @p[tag=target] ~ ~ ~ scoreboard players set @p[tag=self, scores={temp1=!0}] result1 1
tag @s remove self