tag @s add self
execute @a[tag=target] ~ ~ ~ scoreboard players operation @s temp1 = @s team
execute @a[tag=target] ~ ~ ~ scoreboard players operation @s temp1 -= @e[c=1, tag=self] team
tag @a[tag=target, scores={temp1=0}] remove target
tag @s remove self