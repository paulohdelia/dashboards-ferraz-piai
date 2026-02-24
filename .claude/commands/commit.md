Analyze all current changes (staged and unstaged) and create a commit following Conventional Commits.

Steps:
1. Run `git add .`
2. Run `git diff --cached` to see what will be committed
3. Create a commit with the appropriate prefix based on the changes:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `chore:` for maintenance, config, dependencies
   - `refactor:` for code restructuring without behavior change
   - `style:` for formatting, CSS, visual changes
   - `docs:` for documentation only
   - `perf:` for performance improvements

Rules:
- Message must be in lowercase after the prefix
- Keep the message short and direct (max ~50 chars)
- Write the message in Portuguese
- Do NOT add body or footer — single line only
- Do NOT use `--no-verify`
- If there are no changes to commit, inform the user and stop

Example format:
```
feat: adicionar filtro por safra na tabela
fix: corrigir cache sempre forçando refresh
chore: atualizar dependências do projeto
```
