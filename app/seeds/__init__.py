from flask.cli import AppGroup
from .users import seed_users, undo_users
from .chronicles import seed_chronicles, undo_chronicles
from .tales import seed_tales, undo_tales
from .threads import seed_threads, undo_threads
from .assets import seed_assets, undo_assets
from .effects import seed_effects, undo_effects
from .locks import seed_locks, undo_locks
# from .characters import seed_characters, undo_characters
# from .places import seed_places, undo_places

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    """Add seed functions here"""
    seed_users()
    seed_chronicles()
    seed_tales()
    seed_threads()
    seed_assets()
    seed_effects()
    seed_locks()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    """Add undo functions here"""
    undo_locks()
    undo_effects()
    undo_assets()
    undo_threads()
    undo_tales()
    undo_chronicles()
    undo_users()