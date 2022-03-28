execute @a[tag=target] ~ ~ ~ function damage/reduce_heal

execute @a[tag=target] ~ ~ ~ scoreboard players operation @s temp1 = @s maxhp
execute @a[tag=target] ~ ~ ~ scoreboard players operation @s temp1 -= @s hp
execute @a[tag=target] ~ ~ ~ scoreboard players operation @s temp1 < @s result1
execute @a[tag=target] ~ ~ ~ scoreboard players operation @s hp += @s temp1
execute @a[tag=target] ~ ~ ~ scoreboard players operation @p[tag=healer] healed += @s temp1

scoreboard players operation @a[tag=target] taken_heal += @s temp1