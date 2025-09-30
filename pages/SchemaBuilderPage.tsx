import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { PlusIcon, TrashIcon, SchemaIcon, FileIcon, SparklesIcon } from '../components/icons';
import { Table, Column, DataType, Settings, AiGeneratedTable } from '../types';
import { generateSchemaFromPrompt } from '../services/geminiService';
import { Spinner } from '../components/Spinner';

// FIX: Add missing 'netlifyPat' property to satisfy the Settings type.
const initialSettings: Settings = {
  geminiApiKey: '',
  supabaseUrl: '',
  supabaseAnonKey: '',
  stripePublicKey: '',
  stripeSecretKey: '',
  githubPat: '',
  netlifyPat: '',
  model: 'gemini-2.5-flash',
};

const DATA_TYPES: DataType[] = ['uuid', 'text', 'varchar', 'int4', 'int8', 'float8', 'boolean', 'timestamp', 'timestamptz'];

const createNewColumn = (): Column => ({
    id: crypto.randomUUID(),
    name: 'new_column',
    dataType: 'text',
    isPrimaryKey: false,
    isUnique: false,
    isNullable: true,
});

const createNewTable = (): Table => ({
    id: crypto.randomUUID(),
    name: 'new_table',
    columns: [
        {
            id: crypto.randomUUID(),
            name: 'id',
            dataType: 'uuid',
            defaultValue: 'uuid_generate_v4()',
            isPrimaryKey: true,
            isUnique: true,
            isNullable: false,
        },
        {
            id: crypto.randomUUID(),
            name: 'created_at',
            dataType: 'timestamptz',
            defaultValue: 'now()',
            isPrimaryKey: false,
            isUnique: false,
            isNullable: false,
        }
    ]
});

const ColumnRow: React.FC<{ 
    column: Column;
    onUpdate: (updatedColumn: Column) => void; 
    onDelete: () => void;
}> = ({ column, onUpdate, onDelete }) => {
    const handleUpdate = (field: keyof Column, value: any) => {
        onUpdate({ ...column, [field]: value });
    };

    return (
        <div className="grid grid-cols-12 gap-2 items-center p-2 border-t border-gray-200 text-sm">
            <input 
                type="text"
                value={column.name}
                onChange={e => handleUpdate('name', e.target.value)}
                className="col-span-3 bg-gray-50 p-1 rounded border border-transparent focus:border-blue-500 focus:outline-none"
            />
            <select
                value={column.dataType}
                onChange={e => handleUpdate('dataType', e.target.value)}
                className="col-span-3 bg-gray-50 p-1 rounded border border-transparent focus:border-blue-500 focus:outline-none"
            >
                {DATA_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
            <input 
                type="text"
                value={column.defaultValue || ''}
                onChange={e => handleUpdate('defaultValue', e.target.value)}
                placeholder="NULL"
                className="col-span-3 bg-gray-50 p-1 rounded border border-transparent focus:border-blue-500 focus:outline-none"
            />
            <div className="col-span-3 flex items-center justify-around">
                <input type="checkbox" checked={column.isPrimaryKey} onChange={e => handleUpdate('isPrimaryKey', e.target.checked)} title="Primary Key" className="h-4 w-4" />
                <input type="checkbox" checked={!column.isNullable} onChange={e => handleUpdate('isNullable', !e.target.checked)} title="Not Null" className="h-4 w-4" />
                <input type="checkbox" checked={column.isUnique} onChange={e => handleUpdate('isUnique', e.target.checked)} title="Unique" className="h-4 w-4" />
                <button onClick={onDelete} className="text-gray-400 hover:text-red-500"><TrashIcon className="w-4 h-4" /></button>
            </div>
        </div>
    );
};

const TableCard: React.FC<{
    table: Table;
    onUpdate: (updatedTable: Table) => void;
    onDelete: () => void;
}> = ({ table, onUpdate, onDelete }) => {
    const addColumn = () => {
        onUpdate({ ...table, columns: [...table.columns, createNewColumn()] });
    };

    const updateColumn = (updatedColumn: Column) => {
        onUpdate({ ...table, columns: table.columns.map(c => c.id === updatedColumn.id ? updatedColumn : c) });
    };

    const deleteColumn = (columnId: string) => {
        onUpdate({ ...table, columns: table.columns.filter(c => c.id !== columnId) });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="flex justify-between items-center p-3 bg-gray-50">
                <input
                    type="text"
                    value={table.name}
                    onChange={e => onUpdate({ ...table, name: e.target.value })}
                    className="font-bold text-lg bg-transparent focus:outline-none w-full"
                />
                <button onClick={onDelete} className="text-gray-500 hover:text-red-500"><TrashIcon /></button>
            </div>
            <div className="grid grid-cols-12 gap-2 items-center px-2 pb-1 text-xs text-gray-500 font-semibold">
                <div className="col-span-3">Name</div>
                <div className="col-span-3">Type</div>
                <div className="col-span-3">Default</div>
                <div className="col-span-3 text-center">PK / NN / UQ</div>
            </div>
            <div>
                {table.columns.map(col => <ColumnRow key={col.id} column={col} onUpdate={updateColumn} onDelete={() => deleteColumn(col.id)} />)}
            </div>
            <div className="p-2 border-t border-gray-200">
                <button onClick={addColumn} className="w-full text-center text-sm py-1 rounded bg-gray-100 hover:bg-gray-200">
                    + Add Column
                </button>
            </div>
        </div>
    );
};

const SqlModal: React.FC<{ sql: string; onClose: () => void }> = ({ sql, onClose }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(sql);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-2xl text-gray-900" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">Generated SQL</h2>
                <div className="relative">
                    <pre className="bg-gray-800 p-4 rounded-md text-sm text-gray-300 max-h-[60vh] overflow-auto">
                        <code>{sql}</code>
                    </pre>
                    <button onClick={handleCopy} className="absolute top-2 right-2 bg-gray-700 text-white px-3 py-1 text-xs rounded-md font-semibold hover:bg-gray-600">
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <div className="flex justify-end mt-4">
                     <button onClick={onClose} className="px-4 py-2 text-sm rounded-md font-semibold hover:bg-gray-100 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const AiSchemaModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
  error: string | null;
}> = ({ isOpen, onClose, onGenerate, isGenerating, error }) => {
  const [prompt, setPrompt] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (prompt.trim() && !isGenerating) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
            <SparklesIcon className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold">Generate Table with AI</h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">Describe the table you want to create. For example, "a users table with email, password, and profile info".</p>
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your table here..."
            className="w-full h-24 bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isGenerating}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded-md font-semibold hover:bg-gray-100 border border-gray-300 transition-colors" disabled={isGenerating}>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isGenerating}
            className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isGenerating ? <><Spinner className="w-4 h-4" /> Generating...</> : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
};


export const SchemaBuilderPage: React.FC = () => {
    const [tables, setTables] = useLocalStorage<Table[]>('silo-build-schema', []);
    const [settings] = useLocalStorage<Settings>('ai-app-builder-settings', initialSettings);
    const [generatedSql, setGeneratedSql] = useState<string | null>(null);
    
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const addTable = () => {
        setTables(prev => [...prev, createNewTable()]);
    };

    const updateTable = (updatedTable: Table) => {
        setTables(prev => prev.map(t => t.id === updatedTable.id ? updatedTable : t));
    };

    const deleteTable = (tableId: string) => {
        if (window.confirm('Are you sure you want to delete this table?')) {
            setTables(prev => prev.filter(t => t.id !== tableId));
        }
    };
    
    const handleAiGenerate = async (prompt: string) => {
        setIsGenerating(true);
        setAiError(null);
        try {
            const aiTable: AiGeneratedTable = await generateSchemaFromPrompt(prompt, settings);
            
            const newTable: Table = {
                id: crypto.randomUUID(),
                name: aiTable.name,
                columns: aiTable.columns.map(col => ({
                    ...col,
                    id: crypto.randomUUID()
                }))
            };

            setTables(prev => [...prev, newTable]);
            setIsAiModalOpen(false);
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred.";
            setAiError(message);
        } finally {
            setIsGenerating(false);
        }
    };

    const generateSql = () => {
        const sqlString = tables.map(table => {
            if (!table.name.trim() || table.columns.length === 0) return '';

            const columnsSql = table.columns.map(col => {
                if (!col.name.trim()) return null;
                
                let colDef = `  "${col.name}" ${col.dataType}`;
                if (col.isPrimaryKey) colDef += ' PRIMARY KEY';
                if (!col.isNullable) colDef += ' NOT NULL';
                if (col.isUnique) colDef += ' UNIQUE';
                
                if (col.defaultValue?.trim()) {
                    const isFunctionCall = col.defaultValue.includes('()');
                    const isNumeric = ['int4', 'int8', 'float8'].includes(col.dataType);
                    if (isFunctionCall || isNumeric) {
                         colDef += ` DEFAULT ${col.defaultValue}`;
                    } else {
                        // Quote string defaults
                         colDef += ` DEFAULT '${col.defaultValue.replace(/'/g, "''")}'`;
                    }
                }
                return colDef;
            }).filter(Boolean).join(',\n');
            
            if (!columnsSql.trim()) return '';

            return `CREATE TABLE IF NOT EXISTS "${table.name}" (\n${columnsSql}\n);`;
        }).filter(Boolean).join('\n\n');
        
        setGeneratedSql(sqlString);
    };

    return (
    <div className="p-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
            <SchemaIcon className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold">Database Schema Builder</h1>
        </div>
        <div className="flex items-center gap-3">
            <button onClick={generateSql} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-lg transition-colors">
                Generate SQL
            </button>
            <button onClick={addTable} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-lg transition-colors">
                <PlusIcon />
                New Table
            </button>
             <button onClick={() => setIsAiModalOpen(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <SparklesIcon />
                Generate with AI
            </button>
        </div>
      </div>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Visually design your database schema. Add tables, define columns and constraints, and then generate the SQL script to create them in your Supabase project.
      </p>

      {tables.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-white/50 rounded-lg p-8 mt-10">
              <FileIcon className="w-16 h-16 mb-4 text-gray-400"/>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Your schema is empty</h2>
              <p>Click "New Table" or "Generate with AI" to start building your database structure.</p>
          </div>
      ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {tables.map(table => (
                  <TableCard
                      key={table.id}
                      table={table}
                      onUpdate={updateTable}
                      onDelete={() => deleteTable(table.id)}
                  />
              ))}
          </div>
      )}
      
      {generatedSql && <SqlModal sql={generatedSql} onClose={() => setGeneratedSql(null)} />}
      <AiSchemaModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onGenerate={handleAiGenerate}
        isGenerating={isGenerating}
        error={aiError}
      />
    </div>
  );
};