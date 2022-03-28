scoreboard players operation @s broken_shield += @s param1
scoreboard players operation @s temp1 = @s param1
scoreboard players operation @s param1 -= @p[tag=victim] shield
scoreboard players operation @p[tag=victim] shield -= @s temp1

execute @p[tag=victim,scores={shield=..0}] ~ ~ ~ function damage/break_shield
execute @p[tag=victim,scores={shield=1..}] ~ ~ ~ function damage/reduce_shield
execute @s[scores={param1=1..}] ~ ~ ~ function damage/execute_damage

scoreboard players set @p[tag=victim,scores={shield=..-1}] shield 0