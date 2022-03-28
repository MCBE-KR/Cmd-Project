scoreboard players set @s result2 0
scoreboard players set @s result3 0
scoreboard players set @s temp1 0

scoreboard players set @s[scores={cool1=0}] temp1 1
scoreboard players set @s[scores={temp1=0}] result3 1

scoreboard players operation @s[scores={temp1=1}] mana -= @s skill1_mana
scoreboard players set @s[scores={temp1=1, mana=0..}] result2 1
scoreboard players set @s[scores={cool1=0, mana=..-1}] result3 2
scoreboard players operation @s[scores={temp1=1, mana=..-1}] mana += @s skill1_mana

function check_mana