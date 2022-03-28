execute @p[tag=victim,scores={cc_resist=1..}] ~ ~ ~ function damage/reduce_cc

scoreboard players operation @s temp1 = @p[tag=victim] stun
scoreboard players operation @s temp2 = @p[tag=victim] stun

scoreboard players operation @p[tag=victim] stun > @s param1

scoreboard players operation @s temp1 -= @s param1
scoreboard players operation @s given_cc -= @s temp1
scoreboard players operation @p[tag=victim] taken_cc -= @s temp1

execute @s[scores={temp1=..-1,temp2=1..}] ~ ~ ~ event entity @e[type=cmd:stun,c=1] cmd:despawn
execute @s[scores={temp1=..-1}] ~ ~ ~ execute @p[tag=victim] ~ ~ ~ summon cmd:stun ^ ^ ^-0.0001
execute @e[type=cmd:stun,c=1] ~ ~ ~ tp ~ ~0.0001 ~ facing @p[tag=victim]