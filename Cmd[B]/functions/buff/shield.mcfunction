scoreboard players add @s shield -2
scoreboard players add @s[scores={shield=500..}] shield -2
scoreboard players add @s[scores={shield=1000..}] shield -2
scoreboard players add @s[scores={shield=2000..}] shield -4
scoreboard players set @s[scores={shield=-1}] shield 0
execute @s[scores={shield=0}] ~ ~ ~ function buff/remove_shield