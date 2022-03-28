tp @s @e[type=cmd:stun,c=1]

scoreboard players add @s stun -1
effect @s[scores={stun=0}] slowness 0
execute @s[scores={stun=0}] ~ ~ ~ event entity @e[type=cmd:stun,c=1] cmd:despawn